import java.util.Scanner;



public class ex_par_ou_impar {
    public static void main(String[]args){

        Scanner entrada = new Scanner (System.in);
        System.out.println("Digite um numero: ");
        double x = entrada.nextDouble();
        int y = 2;
        double resto = x % y;
        if(resto == 0){
            System.out.println("O Numero " + x + ", e par. ");
        }
        else if (resto != 0){
            System.out.println("o Numero " + x + ", e impar. ");
        }

entrada.close();
    }
}
