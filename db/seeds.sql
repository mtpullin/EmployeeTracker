INSERT INTO department (name, id)
VALUES 
('Finance', 1),
('Sales', 2),
('Legal', 3),
('Managment', 4);

INSERT INTO role (title, salary, department_id, id)
VALUES 
('Financial Advisor',55000,1,1 ),
('Sales Representitive', 50000,2,2),
('Lawyer',60000,3,3),
('Manager',45000,4,4);

INSERT INTO employee (first_name, last_name, role_id, manager_id, id)
VALUES
('Jimmy', 'Page', 4, NULL, 1),
('Dave', 'Grohl', 1, 4, 2),
('Dave', 'Matthews', 2, 4, 3),
('Chris', 'Cornell', 3, 4, 4);