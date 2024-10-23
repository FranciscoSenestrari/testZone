import { toast } from "react-hot-toast";

export function ToasterMessage() {
  function handleClick() {
    console.log("click");
    toast.success("Hello World", {
      style: {
        marginTop: "25%",
      },
    });
  }
  return (
    <div>
      <button onClick={() => handleClick()}>toaster</button>
    </div>
  );
}
