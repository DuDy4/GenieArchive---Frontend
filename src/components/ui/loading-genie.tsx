import Genie from "/images/logo.png"


const LoadingGenie = () => {
    return (
        <div className="h-full flex flex-col text-center gap-[12px] py-0 px-[68px] items-center justify-center">
            <div className="icon-container">
                <img src="/images/logo.png" alt="Genie AI" className="icon" />
                <div className="loading-circle"></div>
            </div>
        </div>
    );
}

export default LoadingGenie;