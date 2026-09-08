
import java.util.Scanner;


public class IF_3 {

    public static void main(String[]args){

       Scanner entrada = new Scanner (System.in);
       System.out.println("digite a nota do aluno: ");
       double nota = entrada.nextDouble();
       if (nota >= 7){

        System.out.println("Aluno Aprovado");
       } else if (nota >= 5){
        System.out.println("aluno em recuperação");
       }
       else{
        System.out.println("Aluno Reprovado");
       }
       entrada.close();
    }

    
}
