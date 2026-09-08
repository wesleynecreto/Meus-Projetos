import java.util.Scanner;

public class diasdasemana {
    public static void main(String[]args){
    Scanner entrada = new Scanner(System.in);
    System.out.println("1 -- domingo. ");
    System.out.println("2 -- segunda. ");
    System.out.println("3 -- terça. ");
    System.out.println("4 -- quarta. ");
    System.out.println("5 -- quinta. ");
    System.out.println("6 -- sexta. ");
    System.out.println("7 -- sabado. ");
    System.out.println("digite um dia da semana:  ");

    int opcao = entrada.nextInt();
    switch (opcao) {

        case 1: 
        System.out.println("domingo");
        break;
        case 2: 
        System.out.println("segunda");
        break;
        case 3: 
        System.out.println("terça");
        break;
        case 4: 
        System.out.println("quarta");
        break;
        case 5: 
        System.out.println("quinta");
        break;        case 6: 
        System.out.println("sexta");
        break;
        case 7: 
        System.out.println("sabado");
        break;
        default:
            System.out.println("opção invalida");
        


entrada.close();

}


    }


    
}
