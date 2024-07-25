<template>
	<section>
		<section-title>ui-card</section-title>

		<!-- <component-preview title="Example" :example="ExampleRaw">
			<template #default>
				<Example />
			</template>
		</component-preview> -->

		<ui-grid grid-template-columns="1fr 1fr">
			
			<ui-card 
				image="https://www.laboratorija.lv/images/content/CL-logo-new-fullcolour.png" 
				imageAlt="Centrala Laboratorija" 
				title="Laboratorijas ārstu portāls"
				subtitle="portal.laboratorija.lv"
				titleUrl="https://portal.laboratorija.lv"
			>
				<helper-typography textSize="normal">
					<ul>
						<li>Iespēja redzēt nepabeigtus testēšanas pārskatus – tiešsaiste ar laboratoriju.</li>
						<li>Pacienta analīžu vēsture.</li>
						<li>NVD kvotu izlietojums.</li>
						<li>Analīžu katalogs.</li>
						<li>Elektroniska nosūtījumu aizpildīšana.</li>
					</ul>
				</helper-typography>
			</ui-card>
			<ui-card 
				image="https://www.laboratorija.lv/images/content/Med.png" 
				imageAlt="Medius" 
				title="Ārstu programma Medius"
				subtitle="www.medius.lv"
				titleUrl="http://www.medius.lv"
			>
				<helper-typography textSize="normal">
					<ul>
						<li>Pabeigtu testēšanas pārskatu saņemšana un analīžu vēsture pacienta elektroniskajā kartiņā.</li>
						<li>Elektroniska nosūtījumu aizpildīšana:</li>
						<ul>
							<li>Automātiska pacienta un ārsta nosūtītāja datu ievade.</li>
							<li>Jau sagatavoti nosūtījumu “šabloni” un jaunu izveide.</li>
						</ul>
					</ul>
				</helper-typography>
			</ui-card>
			<ui-card 
				image="https://www.laboratorija.lv/images/content/SM.png" 
				imageAlt="SmartMedical" 
				title="SmartMedical sistēma"
				subtitle="smartmedical.eu"
				titleUrl="https://smartmedical.eu"
			>
				<helper-typography textSize="normal">
					<ul>
						<li>Pabeigtu testēšanas pārskatu saņemšana (kā Ārsts – Nosūtītājs).</li>
						<li>Iespēja pieprasīt un saņemt konkrēta pacienta laboratorijā esošus analīžu rezultātus – rezultātus, ko nosūtījis cits ārsts (kā Ārsts – Speciālists).</li>
						<ul>
							<li>Automātiska pacienta un ārsta nosūtītāja datu ievade.</li>
							<li>Jau sagatavoti nosūtījumu “šabloni” un jaunu izveide.</li>
						</ul>
					</ul>
				</helper-typography>
			</ui-card>
			<ui-card 
				image="https://www.laboratorija.lv/images/content/CL-logo-new-fullcolour.png" 
				imageAlt="Centrala Laboratorija" 
				title="Laboratorijas ārstu portāls"
				subtitle="portal.laboratorija.lv"
				titleUrl="https://portal.laboratorija.lv"
			>
				<helper-typography textSize="normal">
					<ul>
						<li>Iespēja redzēt nepabeigtus testēšanas pārskatus – tiešsaiste ar laboratoriju.</li>
						<li>Pacienta analīžu vēsture.</li>
						<li>NVD kvotu izlietojums.</li>
						<li>Analīžu katalogs.</li>
						<li>Elektroniska nosūtījumu aizpildīšana.</li>
					</ul>
				</helper-typography>
			</ui-card>
			<ui-card 
				image="https://www.laboratorija.lv/images/content/CL-logo-new-fullcolour.png" 
				imageAlt="Centrala Laboratorija" 
				title="Laboratorijas ārstu portāls"
				subtitle="portal.laboratorija.lv"
				titleUrl="https://portal.laboratorija.lv"
			>
				<helper-typography textSize="normal">
					<ul>
						<li>Iespēja redzēt nepabeigtus testēšanas pārskatus – tiešsaiste ar laboratoriju.</li>
						<li>Pacienta analīžu vēsture.</li>
						<li>NVD kvotu izlietojums.</li>
						<li>Analīžu katalogs.</li>
						<li>Elektroniska nosūtījumu aizpildīšana.</li>
					</ul>
				</helper-typography>
			</ui-card>
		</ui-grid>

	</section>
</template>

<script setup>
import ExampleRaw from './example.vue?raw';
import Example from './example.vue';

const { t } = useI18n();

useHead({
	title: t('breadcrumbs.card')
});
</script>