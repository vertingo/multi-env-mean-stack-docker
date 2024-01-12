const { Ticket } = require('../models/ticket.model');


//get all users
exports.getStatistique = async (req, res, next) => {

  try {

    //une entrée ou un dessert au choix
    const e_ou_d_c_total = await Ticket.countDocuments({ gains: 'une entrée ou un dessert au choix' })
    const e_ou_d_c_used = await Ticket.countDocuments({ gains: 'une entrée ou un dessert au choix', isUsed: true })
    const e_ou_d_c_served = await Ticket.countDocuments({ gains: 'une entrée ou un dessert au choix', isUsed: true, isServed: true })

    //un burger au choix
    const b_c_total = await Ticket.countDocuments({ gains: 'un burger au choix' })
    const b_c_used = await Ticket.countDocuments({ gains: 'un burger au choix', isUsed: true })
    const b_c_served = await Ticket.countDocuments({ gains: 'un burger au choix', isUsed: true, isServed: true })


    //un menu du jour
    const m_j_total = await Ticket.countDocuments({ gains: 'un menu du jour' })
    const m_j_used = await Ticket.countDocuments({ gains: 'un menu du jour', isUsed: true })
    const m_j_served = await Ticket.countDocuments({ gains: 'un menu du jour', isUsed: true, isServed: true })

    //un menu au choix
    const m_c_total = await Ticket.countDocuments({ gains: 'un menu au choix' })
    const m_c_used = await Ticket.countDocuments({ gains: 'un menu au choix', isUsed: true })
    const m_c_served = await Ticket.countDocuments({ gains: 'un menu au choix', isUsed: true, isServed: true })


    //70% de réduction
    const r_total = await Ticket.countDocuments({ gains: '70% de réduction' })
    const r_used = await Ticket.countDocuments({ gains: '70% de réduction', isUsed: true })
    const r_served = await Ticket.countDocuments({ gains: '70% de réduction', isUsed: true, isServed: true })


    res.status(200).json({
      success: true,
      data: [{ gain: 'une entrée ou un dessert au choix', used: e_ou_d_c_used, served: e_ou_d_c_served, total: e_ou_d_c_total },
      { gain: 'un burger au choix', used: b_c_used, served: b_c_served, total: b_c_total },
      { gain: 'un menu du jour', used: m_j_used, served: m_j_served, total: m_j_total },
      { gain: 'un menu au choix', used: m_c_used, served: m_c_served, total: m_c_total },
      { gain: '70% de réduction', used: r_used, served: r_served, total: r_total }
      ]
    })

  }
  catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }

};
