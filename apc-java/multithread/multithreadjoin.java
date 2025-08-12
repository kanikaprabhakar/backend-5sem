package multithread;

public class multithreadjoin {
    public static void main(String[] args) {
        Thread thread1 = new Thread(new RunnableTaskJoin());
        thread1.start();
        try {
            thread1.join(); // Wait for thread1 to finish before continuing
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        for (int i = 0; i < 5; i++) {
            System.out.println("parentCount: " + i);
        }
    }
}
class RunnableTaskJoin implements Runnable {
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("childCount: " + i);
        }
    }
}
