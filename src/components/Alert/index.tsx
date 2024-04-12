type Props = {
  text: string;
  setShouldShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Alert = ({ setShouldShowAlert, text }: Props): JSX.Element => (
  <div className='alert' onAnimationEnd={() => setShouldShowAlert(false)}>
    <img src='https://www.freeiconspng.com/thumbs/error-icon/error-icon-4.png' />
    <h4>{text}</h4>
  </div>
);
