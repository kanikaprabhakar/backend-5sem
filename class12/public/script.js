const signup = document.getElementById("signup-form");



signup.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formChidren = signup.children;
    const name = formChidren[0].value;
    const email = formChidren[1].value;
    const password = formChidren[2].value;
    const result = await axios.post("http://localhost:3000/auth/signup", {
        name,
        email, 
        password
    });
    console.log(result.data.message);
});