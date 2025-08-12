package questions;

import java.util.function.Function;

public class q1 {
    public static void main(String[] args) {
        Function<Integer, Integer> f = (x) -> x * 2;
        Function<Integer, Integer> g = (x) -> x + 3;
        Function<Integer, Integer> h = f.andThen(g);
        System.out.println(h.apply(5)); 
    }
}
