window.possible_particles = function(){ return [
	 {
	 	type: "Higgs",
		mass: 125,
		charge: 0,
		points: 125,
		appearence_probabilty: .03,
		half_life: 5,
		decays: [{particles: ["W", "W"], probability: 1.}],
		draw_properties: {
			colors: ["hsl(0, 100%, 50%)", "hsl(0, 40%, 50%)"],
			ratios: [0, 1],
			inner_radius: .03,
			outer_radius: .13,
			inner_center: {x: .07, y: .07},
			outer_center: {x: 0, y: 0}
		},
		animation_function: function(pv){
		 	createjs.Tween.get(pv, {loop: true})
            	.to({ scaleX: 0.9, scaleY: 1.1 }, 200)
            	.to({ scaleX: 1.1, scaleY: 0.9 }, 200);
		   },
		facts:[
			"Higgs boson was discovered in 2012 by CMS and ATLAS collaborations at LHC at CERN","The measured mass of the Higgs boson is around 126 Gev/c^2.","The spin of the Higgs boson is 0.","The Higgs boson is a particle which gives mass to elementary particles."	
		 ]
	},
		
	 {
	 	type: "electron",
		mass: 0.0005,
		charge: -1,
		points: 1,
		appearence_probabilty: .03,
		draw_properties: {
			colors: ["hsl(120, 100%, 50%)", "hsl(120, 40%, 50%)"],
			ratios: [0, 1],
			inner_radius: .02,
			outer_radius: .04,
			inner_center: {x: .01, y: .01},
			outer_center: {x: 0, y: 0}
		},
		animation_function: function(pv){
		 	createjs.Tween.get(pv, {loop: true})
            	.to({ scaleX: 0.9, scaleY: 1.1 }, 200)
            	.to({ scaleX: 1.1, scaleY: 0.9 }, 200);
		   },
			facts:[
				"The electron was discovered by J.J. Thomson in 1897.","The electron charge was firstly carefully measured by Robert Millikan in 1909.","We still think, that the electron is point-like."
			  ]
	},

	 {
	 	type: "positron",
		mass: 0.0005,
		charge: 1,
		points: 1,
		appearence_probabilty: .03,
		draw_properties: {
			colors: ["hsl(120, 100%, 50%)", "hsl(120, 40%, 50%)"],
			ratios: [0, 1],
			inner_radius: .02,
			outer_radius: .04,
			inner_center: {x: .01, y: .01},
			outer_center: {x: 0, y: 0}
		},
		animation_function: function(pv){
		 	createjs.Tween.get(pv, {loop: true})
            	.to({ scaleX: 0.9, scaleY: 1.1 }, 200)
            	.to({ scaleX: 1.1, scaleY: 0.9 }, 200);
		   },
			facts:[
				"Carl D. Anderson discovered the positron in 1932.","The positron is the antiparticle of the electron.","Dirac predicted the existance of the positron 4 years before its discovery."
			  ]
	},

	 {
	 	type: "muon",
		mass: 0.1,
		charge: -1,
		points: 1,
		appearence_probabilty: .03,
		draw_properties: {
			colors: ["hsl(120, 100%, 50%)", "hsl(120, 40%, 50%)"],
			ratios: [0, 1],
			inner_radius: .02,
			outer_radius: .04,
			inner_center: {x: .01, y: .01},
			outer_center: {x: 0, y: 0}
		},
		animation_function: function(pv){
		 	createjs.Tween.get(pv, {loop: true})
            	.to({ scaleX: 0.9, scaleY: 1.1 }, 200)
            	.to({ scaleX: 1.1, scaleY: 0.9 }, 200);
		   },
			facts:[
				"The muon was discovered by Carl D. Anderson in 1936.","The mass of the muon is about 207 times the mass of the electron."
			  ]
	},

	 {
	 	type: "neutrino",
		mass: 0.00001,
		charge: 0,
		points: 1,
		appearence_probabilty: .03,
		draw_properties: {
			colors: ["hsl(120, 100%, 50%)", "hsl(120, 40%, 50%)"],
			ratios: [0, 1],
			inner_radius: .02,
			outer_radius: .04,
			inner_center: {x: .01, y: .01},
			outer_center: {x: 0, y: 0}
		},
		animation_function: function(pv){
		 	createjs.Tween.get(pv, {loop: true})
            	.to({ scaleX: 0.9, scaleY: 1.1 }, 200)
            	.to({ scaleX: 1.1, scaleY: 0.9 }, 200);
		   },
			facts:[
				"The neutrino was discovered by Cowan and Reines in 1956.","There are three neutrinos: the electron neutrino, the muon neutrino, and the tau neutrino.","The neutrino was theorized by Wolfgang Pauli in 1930 to try to explain the Beta decay."
			  ]
	},

	 {
	 	type: "photon",
		mass: 0.0000,
		charge: 0,
		points: 1,
		appearence_probabilty: .03,
		draw_properties: {
			colors: ["hsl(120, 100%, 50%)", "hsl(120, 40%, 50%)"],
			ratios: [0, 1],
			inner_radius: .02,
			outer_radius: .04,
			inner_center: {x: .01, y: .01},
			outer_center: {x: 0, y: 0}
		},
		animation_function: function(pv){
		 	createjs.Tween.get(pv, {loop: true})
            	.to({ scaleX: 0.9, scaleY: 1.1 }, 200)
            	.to({ scaleX: 1.1, scaleY: 0.9 }, 200);
		   },
			facts:[
				"The photon is the constituent of light.","Photons in the vacuum move always at 299792km/s."
			  ]
	}

];}
