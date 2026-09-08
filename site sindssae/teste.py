from google import genai

# 1. Configura o cliente com a sua chave de API
client = genai.Client(api_key="AQ.Ab8RN6JQmlPhPD1SLrkWrJGAVMc4XslTyhJyqLj_T1rJDCz0Lw")

# 2. Pergunta o que você quer que a IA responda
pergunta = "usando 007.py crie uma pagina de login e senha"
print("Enviando pergunta para o Gemini...")

# 3. Chama o modelo correto (Gemini 2.5 Flash)
response = client.models.generate_content(
    model="gemini-3.6-flash",
    contents=pergunta,
)

# 4. Mostra o resultado no terminal
print("\n--- Resposta do Gemini ---")
print(response.text)
