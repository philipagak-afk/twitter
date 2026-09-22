import main from "../assets/main.jpg";

function Signup() {
  return (
    <div className="auth">
        <div className="left">
            <img src={main} alt="assets/main.jpg" />
        </div>
        <form className="right">
            <input type="text" placeholder="Enter your name" />
            <input type="text" placeholder="Enter your email adress" />
            <input type="text" placeholder="Enter your password" />
         
            <button>Signup</button>

            <h2>Already have an account ? signin</h2>


           </form>    
    </div>
  )
}

export default Signup