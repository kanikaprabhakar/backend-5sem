import java.util.function.Function;

public class functions{
    public static void main(String[] args) {
        Function<Integer, Integer> squareFunction = x -> x * x;
        //passing array of integers to the function
        Integer[] numbers = {1, 2, 3, 4, 5};
        for (Integer number : numbers) {
            Integer result = squareFunction.apply(number);
            System.out.println(result);
        }
    }
}