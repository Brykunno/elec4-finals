import Form from "../components/Form"

function Login(){
    return (
        <div className="h-screen flex justify-center items-center w-full">
            <Form route="/api/token/" method="login"/>
        </div>
    )
}
export default Login