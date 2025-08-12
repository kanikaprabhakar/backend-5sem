package multithread;

public class synchronisation {
    static int staticCount = 0;

    public static void main(String[] args) {
        Thread t1 = new r();
        Thread t2 = new r();
        t1.start();
        t2.start();
        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(staticCount);
    }

    public static synchronized void count() {
        staticCount++;
    }
}

class r extends Thread {
    public void run() {
        for (int i = 0; i < 1000; i++) {
            synchronisation.count();
        }
    }
}
