

public class dependency {
    public static void main(String[] args) {
        Phone phone = new Phone();
        Nokia nokia = new Nokia(phone);
        // nokia.N();
        Camera camera = new Camera(nokia);
        camera.C();;
    }
}

class Phone {
    public void P() {
        System.out.println("Hello from Phone!");
    }
}

class Nokia{
    private Phone phone;
    public Nokia(Phone phone) {
        this.phone = phone;
    }
    
    public void N() {
        
        System.out.println("Hello from Nokia!");
        phone.P();
    }


    
}


class Camera {
    private Nokia nokia;
    public Camera(Nokia nokia){
        this.nokia = nokia;

    }
    public void C() {
        nokia.N();
        System.out.println("Hello from Camera!");
    }
}
