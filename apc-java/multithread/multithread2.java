package multithread;

public class multithread2 {
    public static void main(String[] args) {
        Thread thread1 = new Thread(new R());
        thread1.start();
    }
}
class R implements Runnable {
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("childCount: " + i);
        }
    }
}
