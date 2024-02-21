import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function MyFooter() {
    return (
        <Navbar bg="dark" data-bs-theme="dark" className="mt-4">
            <Container>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-center">
                    <Navbar.Text>
                        © {new Date().getFullYear()} Progetto Settimana 15
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyFooter;
