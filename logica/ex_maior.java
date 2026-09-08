import java.util.Scanner;


public class ex_maior {
    public static void main(String[]args){
        Scanner entrada = new Scanner (System.in);

        System.out.println("Digite o Primeiro Numero: ");
        int entradap = entrada.nextInt();
        System.out.println("Digite o segundo Numero: ");
        int entradas = entrada.nextInt();
        if(entradap > entradas){

            System.out.println("o Primeiro e maior que o segundo ");
        }
        else if (entradas > entradap){
            System.out.println("O segundo e maior que o primeiro");
        }
        else {
            System.out.println("São iguais");
        }
 entrada.close();
 
    }

    
}
