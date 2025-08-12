package multithread;
public class multithread {

    public static void main(String[] args) {
        RunnableTask m = new RunnableTask();
        Thread thread1 = new Thread(m);

        thread1.start();
        for (int i = 0; i < 5; i++) {
            System.out.println("parentCount: " + i);
        }
    }
}

class RunnableTask implements Runnable {
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("childCount: " + i);
        }
    }
}