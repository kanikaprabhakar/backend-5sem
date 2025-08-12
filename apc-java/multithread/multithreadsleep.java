package multithread;

public class multithreadsleep {
    public static void main(String[] args) {
        Thread thread1 = new Thread(new RunnableTaskSleep());
        thread1.start();
       
        for (int i = 0; i < 5; i++) {
            System.out.println("parentCount: " + i);
            try {
                Thread.sleep(1000); // Sleep for 1 second
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

class RunnableTaskSleep implements Runnable {
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("childCount: " + i);
            
        }
    }
}
