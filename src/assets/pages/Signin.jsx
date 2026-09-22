function Signin() {
  return (
    <div className="auth">
        <div className="left">
          <img src="{main}" alt="assets/main.jpg" />
            
        </div>
        <form>
          
            <input type="text" placeholder="Enter email adress" />
            <input type="text" placeholder="Enter your password" />
          
            <button>log in</button>
            <h1>Don't have an account ? signup</h1>

           </form>    
    </div>
  )
}

export default Signin