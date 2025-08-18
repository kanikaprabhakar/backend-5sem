const signup = document.getElementById("signup-form");


signup.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formChildren = signup.children;
    const name = formChildren[0].value;
    const email = formChildren[1].value;
    const password = formChildren[2].value;
    
    try {
        const result = await axios.post("http://localhost:3000/auth/signup", {
            name,
            email, 
            password
        });
        alert(result.data.message);
    } catch (error) {
        alert(error.response?.data?.error || "Signup failed");
    }
});