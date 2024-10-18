import Field from "./field";

function SignInForm() {
    return(
        <>
            <Field text="Email"/>
            <br></br>
            <Field text="Password"/>
            <br></br>
            <br></br>
            <button>
                <p>Sign In</p>
            </button>
        </>
    );
}

export default SignInForm;