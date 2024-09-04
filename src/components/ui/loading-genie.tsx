import Genie from "/images/logo.png";

const LoadingGenie = () => {
    return (
        <div className="h-full flex flex-col text-center gap-[12px] py-0 px-[68px] items-center justify-center">
            <div className="icon-container relative">
                <img src={Genie} alt="Genie AI" className="icon" />
                <div className="loading-circle"></div>
                <div className="sparkles">
                    <div className="sparkle sparkle1"></div>
                    <div className="sparkle sparkle2"></div>
                    <div className="sparkle sparkle3"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingGenie;