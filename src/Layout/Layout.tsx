interface LayoutProps {
    children?: JSX.Element,
    withoutLayout?: boolean
}

const Layout = ({children, withoutLayout = false} : LayoutProps) => {
    return (
        <div className="w-full h-full">
            <div className={`${!withoutLayout && "container mx-auto bg-white"}`}>
            {children}
        </div>
        </div>
    )
}

export default Layout;