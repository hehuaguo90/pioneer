package  com.wellsys.common.utils.jdbcTemplate;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository(value="jdbcBaseDao")
@Scope("prototype")
public class JdbcBaseDaoImp implements IjdbcBaseDao {
	private static final Log log = LogFactory.getLog(JdbcBaseDaoImp.class);
	@Resource(name="jdbcTemplate")
	private JdbcTemplate jdbcTemplate;
	
}
