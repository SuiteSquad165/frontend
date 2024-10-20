import styles from "./splitLayout.module.css";

//In form, include the signup/signin components like so: <SplitLayout form={<SignUpForm/>}/>

const SplitLayout = ({form} : {form:any}) => {
    return (
      <>
        <div className={styles.splitlayoutcontainer}>
            <div className={styles.left}>
              <h1 id={styles.title}>LikeHome</h1>
            </div>
            <div className={styles.right}>
              <div className={styles.formContainer}>
                {form}
              </div>
            </div>
        </div>
      </>
    );
};

export default SplitLayout;