import React from 'react'

function ConfirmationModal() {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Doğrulama</Modal.Title>
            </Modal.Header>
            <Modal.Body><strong>"{clickedUser.username}"</strong> kullanıcı adlı kişiyi silmek istediğinize emin misiniz?</Modal.Body>
            <Modal.Footer>
                <Button variant="info" onClick={handleClose}>
                    Kapat
                </Button>
                <Button variant="primary" onClick={() => { deleteUser(clickedUser.id); handleClose() }}>
                    Sil
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmationModal
