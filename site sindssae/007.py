import json
import os
import time
from google import genai
from google.genai import types
from google.genai.errors import ServerError # Captura especificamente o erro 503

# Inicializa o cliente do Gemini
client = genai.Client(api_key="AQ.Ab8RN6JQmlPhPD1SLrkWrJGAVMc4XslTyhJyqLj_T1rJDCz0Lw")

# Prompt do Sistema - Blindado para retornar arquivos limpos
SYSTEM_PROMPT = """ # NOME DO AGENTE: Intranet Stack Architect & Engineer
Você é um desenvolvedor Fullstack sênior especialista em Intranets.
Sua única tarefa é gerar os códigos para as páginas solicitadas e colocá-los estritamente dentro de uma estrutura JSON.

Você DEVE responder APENAS com um objeto JSON válido, sem tags markdown (não use ```json ou ```). O JSON deve ter o nome do arquivo como chave e o código como valor.

Exemplo de resposta:
{
  "index.html": "conteúdo html",
  "style.css": "conteúdo css"
}
"""

pergunta_usuario = (
    "crie altere as página de login para a minha intranet seguindo fielmente o css encontrado na pagina https://www.sindsaae.org.br/ fazendo parecer uma extenção do site ja existente . "
    "Preciso do código para o arquivo index.html, tanbem crie uma pagina ja logado e um banco de dados que confere os loguin  e para o arquivo style.css com  o tema do site https://www.sindsaae.org.br/."
)

# Configuração estruturada solicitando JSON
configuracao = types.GenerateContentConfig(
    system_instruction=SYSTEM_PROMPT,
    response_mime_type="application/json",
)

def chamar_agente_com_retry(prompt, config, max_tentativas=3, espera_segundos=4):
    """Função que tenta chamar a API e se der erro 503, espera e tenta novamente."""
    for tentativa in range(1, max_tentativas + 1):
        try:
            print(f"🤖 Agente trabalhando... (Tentativa {tentativa} de {max_tentativas})")
            
            # Forçamos o gemini-2.5-flash por ser o mais estável para geração de código estruturado
            resposta = client.models.generate_content(
                model="gemini-3.6-flash",
                contents=prompt,
                config=config,
            )
            return resposta.text
            
        except ServerError as e:
            if tentativa == max_tentativas:
                print(f"❌ Servidores do Google continuam instáveis após {max_tentativas} tentativas.")
                raise e
            print(f"⚠️ Servidor ocupado (Erro 503). Aguardando {espera_segundos} segundos para tentar novamente...")
            time.sleep(espera_segundos)
        except Exception as e:
            print(f"❌ Ocorreu um erro inesperado: {e}")
            raise e

# 1. Executa a chamada protegida contra o erro 503
texto_resposta = chamar_agente_com_retry(pergunta_usuario, configuracao)

# 2. Processa o resultado e cria os arquivos fisicamente na máquina
if texto_resposta:
    try:
        # Tenta decodificar o JSON gerado pelo agente
        arquivos_criados = json.loads(texto_resposta)
        
        print("\n💾 Gravando os arquivos gerados no seu computador...")
        for nome_arquivo, conteudo_codigo in arquivos_criados.items():
            # Cria e salva o arquivo de verdade na pasta do seu projeto
            with open(nome_arquivo, "w", encoding="utf-8") as f:
                f.write(conteudo_codigo)
            print(f"✅ Arquivo criado: {os.path.abspath(nome_arquivo)}")
            
        print("\n🎉 Sucesso! Seu agente concluiu a criação dos arquivos.")
        
    except json.JSONDecodeError:
        print("\n⚠️ A API respondeu, mas o formato não veio em um JSON limpo. Salvando o texto bruto para análise:")
        with open("resposta_bruta.txt", "w", encoding="utf-8") as f:
            f.write(texto_resposta)
        print("Salvo em: resposta_bruta.txt")
