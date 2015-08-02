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
			"Higgs boson was discovered in 2012 by CMS and ATLAS collaborations at LHC at CERN",	
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
				"We still think, that the electron is point-like."
			  ]
	}	
];}
