import java.util.Scanner;


public class vogais {
    public static void main(String[]args){

        Scanner entrada = new Scanner(System.in);
        System.out.println("Digite uma letra:  ");
        char letra = entrada.next().toLowerCase().charAt(0);
        if (letra =='a' || letra == 'e' || letra == 'i' || letra == 'o' || letra == 'u'){
            System.out.println("é uma vogal. ");
        }
        else{
            System.out.println("é uma consuante. ");
        }
        entrada.close();
    }
    
}
