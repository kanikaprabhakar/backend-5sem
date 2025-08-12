package multithread;
import java.lang.annotation.Annotation;
public class customannotation {
    public static void main(String[] args) {
        Test1 test = new Test1();
        test.model = "Galaxy S21";
        Annotation a = test.getClass().getAnnotation(Smartphone.class);
    }
}
@interface Smartphone {
        int calling();
        int version();
}
@Smartphone(calling=1, version=2)
class Test1{
    String model;
}