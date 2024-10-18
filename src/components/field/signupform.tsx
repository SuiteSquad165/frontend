import Field from "./field";

function SignUpForm() {
    return(
        <>
            <Field text="Email"/>
            <br></br>
            <Field text="Password"/>
            <br></br>
            <Field text="Confirm Password"/>
            <br></br>
            <br></br>
            <button>
                <p>Sign Up</p>
            </button>
        </>
    );
}

export default SignUpForm;