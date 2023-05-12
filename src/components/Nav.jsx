import { Navbar , Button} from "react-daisyui"

const Nav = () => {
    return (
        <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
          <Navbar {...args}>
            <Button className="text-xl normal-case" color="ghost">
              daisyUI
            </Button>
          </Navbar>
        </div>
      )
}

export default Nav