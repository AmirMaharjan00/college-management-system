/**
 * Sidebar
 * 
 * @since 1.0.0
 */
export const Sidebar = () => {
    return <aside class="cmg-sidebar" id="cmg-sidebar">
        <div class="cmg-menu">
            <div class="cmg-menu-item main-menu">
                <h2 class="submenu-heading">
                    <span>Main</span>
                </h2>
                <ul class="cmg-submenu">
                    <li class="cmg-list-item active">
                        <a href="#" class="cmg-icon-wrapper">
                            <span class="cmg-icon"><i class='bx bxs-dashboard'></i></span>
                            <span class="cmg-icon-label">Dashboard</span>
                        </a>
                    </li>
                    <li class="cmg-list-item">
                        <a href="#" class="cmg-icon-wrapper">
                            <span class="cmg-icon"><i class="fa-solid fa-table-list"></i></span>
                            <span class="cmg-icon-label">Application</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="cmg-menu-item layout-menu">
                <h2 class="submenu-heading">
                    <span>Layout</span>
                </h2>
                <ul class="cmg-submenu">
                    <li class="cmg-list-item"><a href="#">Default</a></li>
                    <li class="cmg-list-item"><a href="#">Mini</a></li>
                    <li class="cmg-list-item"><a href="#">RTL</a></li>
                    <li class="cmg-list-item"><a href="#">Box</a></li>
                    <li class="cmg-list-item"><a href="#">Dark</a></li>
                </ul>
            </div>
            <div class="cmg-menu-item peoples-menu">
                <h2 class="submenu-heading">
                    <span>Peoples</span>
                </h2>
                <ul class="cmg-submenu">
                    <li class="cmg-list-item"><a href="#">Student</a></li>
                    <li class="cmg-list-item"><a href="#">Parents</a></li>
                    <li class="cmg-list-item"><a href="#">Guardians</a></li>
                    <li class="cmg-list-item"><a href="#">Teachers</a></li>
                </ul>
            </div>
            <div class="cmg-menu-item academic-menu">
                <h2 class="submenu-heading">
                    <span>Academic</span>
                </h2>
                <ul class="cmg-submenu">
                    <li class="cmg-list-item"><a href="#">Classes</a></li>
                    <li class="cmg-list-item"><a href="#">Class Room</a></li>
                    <li class="cmg-list-item"><a href="#">Class Routines</a></li>
                    <li class="cmg-list-item"><a href="#">Section</a></li>
                    <li class="cmg-list-item"><a href="#">Subject</a></li>
                    <li class="cmg-list-item"><a href="#">Syllabus</a></li>
                    <li class="cmg-list-item"><a href="#">Time Table</a></li>
                    <li class="cmg-list-item"><a href="#">Home Work</a></li>
                    <li class="cmg-list-item"><a href="#">Examinations</a></li>
                    <li class="cmg-list-item"><a href="#">Reasons</a></li>
                </ul>
            </div>
        </div>
    </aside>
}