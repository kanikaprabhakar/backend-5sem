


async function getUser(){
     let r = await axios.get("http://localhost:3000/user");
     let user = r.data;
     console.log(user);
}


getUser();