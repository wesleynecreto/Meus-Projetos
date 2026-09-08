
import java.util.Scanner;

public class voto {

public static void main (String[]args){
    Scanner entrada = new Scanner(System.in);
    System.out.print("digite sua idade: ");
    int idade = entrada. nextInt();
    entrada.nextLine();
    System.out.print("Você e brasileiro ou naturalizado? (sim/não): ");
    String nacionalidade = entrada.nextLine().toLowerCase();

    if(idade >= 16 && nacionalidade.equals("sim")) {
        System.out.println("Você pode Votar!");
    } else {
        System.out.println("Você Não pode Votar!");
    }
    entrada.close();
}
    
}
