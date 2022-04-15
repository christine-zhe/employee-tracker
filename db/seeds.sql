INSERT INTO department (name)
VALUES
  ('Engineering'),
  ('Heroes of HTML'),
  ('Git Gurus');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Ronald', 50000, 1),
  ('Virginia', 60000, 2),
  ('Piers', 100000, 1),
  ('Charles', 200000, 1);


  INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 1, 0),
  ('Charles', 'LeRoi', 2, 1),
  ('Katherine', 'Mansfield', 2, 1),
  ('Dora', 'Carrington', 3, 0),
  ('Edward', 'Bellamy', 3, 0),
  ('Montague', 'Summers', 3, 1),
  ('Octavia', 'Butler', 3, 1);