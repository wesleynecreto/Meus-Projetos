import java.util.Scanner;

public class ex_1 {
    public static void main(String[]args){
        Scanner entrada = new Scanner (System.in);
        System.out.println("digite aqui um numero qualquer: ");
        int numero = entrada.nextInt();
        if (numero >= 0){
            System.out.println("O numero " + numero + ", que vc digitou, é POSITIVO");
        }
        else if(numero < 0){
            System.out.println("O numero " + numero + ", que vc digitou é NEGATIVO");
        }
    }

}
