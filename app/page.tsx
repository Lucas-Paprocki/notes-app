'use client';

import { utimes } from 'fs';
/*
use state is used for the array of boxes 
*/

import { useState, useEffect } from 'react';


/*
handle imput function makes possibility of text box expanding instead of scrolling
*/

function handleInput(e: React.FormEvent<HTMLTextAreaElement>) {
  const textarea = e.currentTarget;
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
}

/*
Head is the title of each text box, new one created with each new text box
*/



function Head() {
    return (
    <div className= 'title'>
    <h3 >
    <textarea
      placeholder='insert title'
      onInput={handleInput}
    />
    </h3>
    </div>
    );
  }

/*
Textbox is set very similar to the head function, no auto zero margin so it is justified left
*/

function Textbox() {
  return (
    <div className='textblock'>
    <textarea
      onInput={handleInput}
      placeholder="Write away!"
    />
    </div>
  );
}

/*
determines order of head and textbox functions,
used later to map out nre entries 
*/



function Entry() {
  return (
    <>
    <div className='full-entry'>
      <Head />
      <Textbox />   
    </div>
     </>
  );
}

/*
Name is saved in home,
onChange is what edits the name and also saved in home 
*/

function EditName ({name, onChange,}: {name: string; onChange: (name: string) => void;}) {

/*
Editing features are  a boolean, whether they are editing the name or not, shows false so you need ot click on button first 
draft features use the name that is saved in home 
*/

const [editing, setEditing] = useState(false);
const [draft, setDraft] = useState(name);

/*
trims the draft before saving so ther is no whitespace, auto saves when editing is escaped 
*/

function save(){
  onChange(draft.trim());
  setEditing(false);
}


/*
It automatically focuses, pulls from draft and displays your name here 
e.target.value stores new text as draft
onBlur automatilly saves when focus is lost 
onKeyDown makes a new event where if enter is pressed it saves, and if escape is pressed editing stops 
*/

if (editing) {
  return (
  <input 
    autoFocus
    value={draft}
    placeholder='your name here'
    onChange={(e)=> setDraft(e.target.value)}
    onBlur={save}
    onKeyDown={(e) => {if (e.key === 'Enter') save(); if(e.key === 'Escape') setEditing(false);}}
    />
  );
}

/*
Once you click on button, and editing is set to true
when clicked, the editing is flipped to true 
the saved name is copied back to draft to be edited, name and draft are always same value 
the entered name, or 'your name here is showed in the button'
*/

return (
  <button
    className= 'name-button'
    onClick={() => {setDraft(name); setEditing(true);}}
  >

  {name || 'your name here'}

  </button>
)
}

export default function Home() { 
  const [boxes, setBoxes] = useState([0]);
  const [name, setName] = useState('');
  

/*
addBox adds a new entry 
*/


  function addBox() {
    setBoxes((prev) => [...prev, prev.length]);
  }

/*
useEffect is the import that sets up the listener 
handleKeyDown runs the keyboard event that combines ctrl and a
prevent default tells the broswer NO if I already have a keybind for ctrl a
addBox adds the box 
window is the browser, addEventListener combines the keydown function from earlier with the actual keys being pressed
The opposite is then returned, so things dont pile up 
the ending [] makes sure only one listener is attached for each render 
*/


    useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        addBox();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main>
      <div className='top'>
      <h1>notes</h1>
      <h2>
        welcome, <EditName name={name} onChange={setName} />
      </h2>
      </div>
      <button className= 'entry-button' onClick={addBox}>
        add entry
      </button>

      <div className='entry-func'>
      {
     boxes.map((id) => (
        <Entry key={id} />
      ))}
    </div>
    </main>
    
  );
}

