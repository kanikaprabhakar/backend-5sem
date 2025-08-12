package multithread;

public class functionalinterface {
    interface MyFunctionalInterface {
        void m(int n);
    }

    public static void main(String[] args) {
        MyFunctionalInterface my = (int n) -> System.out.println(n*n);
        my.m(5);
        my.m(10);
    }
}
