<?php
class ContactsController{
    private $twig;

    function __construct($twig){
        $this->twig = $twig;
    }
    function render(){
        return $this->twig->render('contacts.twig');
    }
} 
