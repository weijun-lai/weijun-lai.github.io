
<?php

require_once "database.php";

function search_data($value) {
	return select_table('',$value);
}

function get_all_data() {
$value=array (
  'db_name' => 'movieBooker',
  'db_table_name' => 'account',
  'db_values' => 
  array (
    'condition' => '1 ORDER BY id DESC',
  ),
  'db_attributes' => 
  array (
    'username' => '',
    'password' => '',
  ),
);
	return select_table('',$value);
}

function add_new_data($value) {
	return insert_table('',$value);
}

?>
