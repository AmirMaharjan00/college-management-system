import { Header } from './header'
import { Main } from './main'
import { Sidebar } from './sidebar'

export const Index = () => {
    return <>
        <Header />
        <div class="cmg-body" id="cmg-body">
            <Main />
            <Sidebar />
        </div>
    </>
}