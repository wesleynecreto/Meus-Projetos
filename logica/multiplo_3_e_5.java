import java.util.Scanner;

public class multiplo_3_e_5 {
    public static void main(String[]args){
        Scanner entrada = new Scanner(System.in);
        System.out.println("Digite um numero: ");
        int num = entrada.nextInt();
        int x = 5;
        int y = 3;
        int restde5 = (num % 5);
        int restde3 = (num % 3);
        if(restde5 == 0 && restde3 == 0){
            System.out.println("é Multiplo de 5 e 3. ");
        }
        else if (restde5 == 0 && restde3 != 0){
            System.out.println("é multiplo apenas de 5. ");
        }
        else if(restde5 != 0 && restde3 == 0){
            System.out.println("é multiplo apenas de 3. ");

        }
        else{
            System.out.println("Não e Multiplo de nenhum dos dois. ");
        }
 entrada.close();
    }
    
}
