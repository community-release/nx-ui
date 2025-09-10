<template>
	<ui-grid grid-template-columns="2fr 1fr">
		<div>
			<ui-label 
				id="typeahead-label"
				text="Book name" 
				description="Select book from a list or enter book name manually" 
				label-for="input-example" 
				:required="required"
				
			>
				<ui-typeahead-input 
					v-model="value"
					:options="options"
					:dictionary="dictionary"
					input-id="input-example"
					:error="error"
					:required="required"
					:disabled="disabled"
					color="primary"
				>
				</ui-typeahead-input>
			</ui-label>
			<p>
				value: {{ value }}
			</p>
		</div>

		<ui-grid>
			<ui-select v-model="size" :options="sizeList" label="size"></ui-select>
			<ui-select v-model="shape" :options="shapeList" label="shape"></ui-select>
			<ui-checkbox v-model="required">required</ui-checkbox>
			<ui-checkbox v-model="disabled">disabled</ui-checkbox>
			<ui-checkbox v-model="error">error</ui-checkbox>
		</ui-grid>
	</ui-grid>
</template>

<script setup>
const options = [
	{ value: 1, name: "War and Peace" },
	{ value: 2, name: "Crime and Punishment" },
	{ value: 3, name: "Anna Karenina" },
	{ value: 4, name: "The Brothers Karamazov" },
	{ value: 5, name: "Don Quixote" },
	{ value: 6, name: "One Hundred Years of Solitude" },
	{ value: 7, name: "Love in the Time of Cholera" },
	{ value: 8, name: "The Great Gatsby" },
	{ value: 9, name: "To Kill a Mockingbird" },
	{ value: 10, name: "The Catcher in the Rye" },
	{ value: 11, name: "Moby Dick" },
	{ value: 12, name: "The Old Man and the Sea" },
	{ value: 13, name: "For Whom the Bell Tolls" },
	{ value: 14, name: "A Farewell to Arms" },
	{ value: 15, name: "The Sun Also Rises" },
	{ value: 16, name: "Les Misérables" },
	{ value: 17, name: "The Hunchback of Notre-Dame" },
	{ value: 18, name: "Madame Bovary" },
	{ value: 19, name: "The Stranger" },
	{ value: 20, name: "The Plague" },
	{ value: 21, name: "Journey to the End of the Night" },
	{ value: 22, name: "Germinal" },
	{ value: 23, name: "The Count of Monte Cristo" },
	{ value: 24, name: "The Three Musketeers" },
	{ value: 25, name: "Fathers and Sons" },
	{ value: 26, name: "Doctor Zhivago" },
	{ value: 27, name: "The Master and Margarita" },
	{ value: 28, name: "We" },
	{ value: 29, name: "1984" },
	{ value: 30, name: "Animal Farm" },
	{ value: 31, name: "Brave New World" },
	{ value: 32, name: "Fahrenheit 451" },
	{ value: 33, name: "The Trial" },
	{ value: 34, name: "The Castle" },
	{ value: 35, name: "Metamorphosis" },
	{ value: 36, name: "The Divine Comedy" },
	{ value: 37, name: "Inferno" },
	{ value: 38, name: "Paradiso" },
	{ value: 39, name: "Purgatorio" },
	{ value: 40, name: "The Decameron" },
	{ value: 41, name: "The Name of the Rose" },
	{ value: 42, name: "Foucault's Pendulum" },
	{ value: 43, name: "The Betrothed" },
	{ value: 44, name: "The Leopard" },
	{ value: 45, name: "The Idiot" },
	{ value: 46, name: "Demons" },
	{ value: 47, name: "Notes from Underground" },
	{ value: 48, name: "The Possessed" },
	{ value: 49, name: "Lolita" },
	{ value: 50, name: "Pale Fire" },
	{ value: 51, name: "Ada or Ardor" },
	{ value: 52, name: "Invitation to a Beheading" },
	{ value: 53, name: "King, Queen, Knave" },
	{ value: 54, name: "The Enchanted Wanderer" },
	{ value: 55, name: "Dead Souls" },
	{ value: 56, name: "The Overcoat" },
	{ value: 57, name: "Taras Bulba" },
	{ value: 58, name: "Eugene Onegin" },
	{ value: 59, name: "Boris Godunov" },
	{ value: 60, name: "The Bronze Horseman" },
	{ value: 61, name: "The Cherry Orchard" },
	{ value: 62, name: "Three Sisters" },
	{ value: 63, name: "Uncle Vanya" },
	{ value: 64, name: "The Seagull" },
	{ value: 65, name: "Hamlet" },
	{ value: 66, name: "Macbeth" },
	{ value: 67, name: "King Lear" },
	{ value: 68, name: "Othello" },
	{ value: 69, name: "Romeo and Juliet" },
	{ value: 70, name: "A Midsummer Night's Dream" },
	{ value: 71, name: "Twelfth Night" },
	{ value: 72, name: "The Tempest" },
	{ value: 73, name: "Richard III" },
	{ value: 74, name: "Henry V" },
	{ value: 75, name: "Julius Caesar" },
	{ value: 76, name: "Troilus and Cressida" },
	{ value: 77, name: "Timon of Athens" },
	{ value: 78, name: "Cymbeline" },
	{ value: 79, name: "Measure for Measure" },
	{ value: 80, name: "The Merchant of Venice" },
	{ value: 81, name: "Great Expectations" },
	{ value: 82, name: "Oliver Twist" },
	{ value: 83, name: "David Copperfield" },
	{ value: 84, name: "A Tale of Two Cities" },
	{ value: 85, name: "Bleak House" },
	{ value: 86, name: "Hard Times" },
	{ value: 87, name: "Little Dorrit" },
	{ value: 88, name: "Nicholas Nickleby" },
	{ value: 89, name: "The Pickwick Papers" },
	{ value: 90, name: "Barnaby Rudge" },
	{ value: 91, name: "Martin Chuzzlewit" },
	{ value: 92, name: "Our Mutual Friend" },
	{ value: 93, name: "The Mystery of Edwin Drood" },
	{ value: 94, name: "Jane Eyre" },
	{ value: 95, name: "Wuthering Heights" },
	{ value: 96, name: "Villette" },
	{ value: 97, name: "The Professor" },
	{ value: 98, name: "Shirley" },
	{ value: 99, name: "Agnes Grey" },
	{ value: 100, name: "Tenant of Wildfell Hall" }
];

const value = ref('');

const dictionary = {
	list: 'View books list',
	clear: 'Clear input',
	close: 'Close',
	submit: 'Ok',
	itemsFound: `Results found`,
	noItemsFound: `No items found`,
};

const disabled = ref(false);
const required = ref(false);
const error = ref(false);

const size = ref('default');
const sizeList = ref([
	{name: 'large', value: 'large'},
	{name: 'big', value: 'big'},
	{name: 'medium', value: 'medium'},
	{name: 'default', value: 'default'},
	{name: 'small', value: 'small'},
	{name: 'mini', value: 'mini'},
]);

const shape = ref('');
const shapeList = ref([
	{name: 'default', value: ''},
	{name: 'round', value: 'round'},
	{name: 'round-square', value: 'round-square'},
	{name: 'square', value: 'square'},
]);
</script>