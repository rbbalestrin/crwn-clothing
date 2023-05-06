import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import {
  createUserDocumentFromAuth,
  createdAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";
import { UserContext } from "../../context/user.context";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields); // desestrutrutura o defaultFormFields para poder ser utilizado individualmente
  const { displayName, email, password, confirmPassword } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const { user } = await createdAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);
      await createUserDocumentFromAuth(user, { displayName });
      // Limpa o formulário após a criação do usuário
      setFormFields(defaultFormFields);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }; //Atualiza o estado de um formulário com base na entrada do usuário.
  //Ela recebe um objeto event como parâmetro e extrai as propriedades "name" e "value" do campo de entrada que acionou o event

  return (
    <div className="sign-up-container">
      <h2>Dont have a account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="displayName"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
