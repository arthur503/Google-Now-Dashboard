<?php

// Import the classes that we're going to be using
use EDAM\Types\Data, EDAM\Types\Note, EDAM\Types\Resource, EDAM\Types\ResourceAttributes;
use EDAM\Error\EDAMUserException, EDAM\Error\EDAMErrorCode;
use EDAM\NoteStore, EDAM\NoteStore\NoteFilter;
use Evernote\Client;

require_once('inc/Evernote/autoload.php');
require_once('inc/Evernote/Evernote/Client.php');
require_once('inc/Evernote/packages/Errors/Errors_types.php');
require_once('inc/Evernote/packages/Types/Types_types.php');
require_once('inc/Evernote/packages/Limits/Limits_constants.php');
require_once("inc/Evernote/packages/NoteStore/NoteStore_types.php");

require_once('config.php');

// A global exception handler for our program so that error messages all go to the console
function en_exception_handler($exception)
{
    echo "Uncaught " . get_class($exception) . ":\n";
    if ($exception instanceof EDAMUserException) {
        echo "Error code: " . EDAMErrorCode::$__names[$exception->errorCode] . "\n";
        echo "Parameter: " . $exception->parameter . "\n";
    } elseif ($exception instanceof EDAMSystemException) {
        echo "Error code: " . EDAMErrorCode::$__names[$exception->errorCode] . "\n";
        echo "Message: " . $exception->message . "\n";
    } else {
        echo $exception;
    }
}
set_exception_handler('en_exception_handler');

// Real applications authenticate with Evernote using OAuth, but for the
// purpose of exploring the API, you can get a developer token that allows
// you to access your own Evernote account. To get a developer token, visit
// https://sandbox.evernote.com/api/DeveloperToken.action
$authToken = $evernote_developer_token;

// Initial development is performed on our sandbox server. To use the production
// service, change "sandbox.evernote.com" to "www.evernote.com" and replace your
// developer token above with a token from
// https://www.evernote.com/api/DeveloperToken.action
$client = new Client(array('token' => $authToken));

$userStore = $client->getUserStore();

$noteStore = $client->getNoteStore();

// List all of the notebooks in the user's account
$notebooks = $noteStore->listNotebooks();
foreach ($notebooks as $notebook) {
    if($notebook->name == 'Class Notes')
		$guid = $notebook->guid;
}

$filter = new NoteFilter();
$filter->notebookGuid = $guid;
$filter->ascending = false;
$filter->order = 1;
$notes = $noteStore->findNotes($authToken, $filter, 0, 5); // Fetch up to 100 notes


$note_titles = array();
foreach($notes->notes as $anote)
{
	array_push($note_titles,$anote->title);
}

if($note_titles[0] == null)
	$note_titles = array('empty'=>true);


echo 'notedata('.json_encode($note_titles).');';