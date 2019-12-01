<?php 
    return [
        [
            "path" => "/",
            "controller" => "IndexController"
        ],
        [
            "path" => "/тренажер",
            "controller" => "TrainingController"
        ],
        [
            "path" => "/тренажер/(.*)",
            "controller" => "TrainingController"
        ],
        [
            "path" => "/обучение/",
            "controller" => "EducationController"
        ],
        [
            "path" => "/контакты",
            "controller" => "ContactsController"
        ]
    ];