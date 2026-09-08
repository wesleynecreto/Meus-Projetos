import java.util.Scanner;

public class ex_intevalo {
    public static void main(String[]args){

        Scanner entrada = new Scanner(System.in);
        System.out.println("Digite um numero: ");
        int numero = entrada.nextInt();
        if(numero >= 10 && numero <=100){
            System.out.println("Está dentro do intervalo!!!");
        }
        else {
            System.out.println("numero fora do intervalo!!!");
        }
        entrada.close();

    }
}
