// PageDomains.tsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./PageDomains.module.scss";
import { getAllDomainsData } from "../../api/api";

const PageDomains = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [domains, setDomains] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchDomains = async () => {
      // Проверяем, что token не равен null
      if (!token) {
        setError("Токен отсутствует.");
        setLoading(false);
        return;
      }

      try {
        const domainsData = await getAllDomainsData(token);
        console.log("Данные доменов:", domainsData);

        const domainsArray = Array.isArray(domainsData) ? domainsData : [domainsData];
        setDomains(domainsArray);
      } catch (err) {
        setError("Не удалось загрузить данные доменов.");
      } finally {
        setLoading(false);
      }
    };

    fetchDomains();
  }, [token]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.pageDomains}>
      <div className="container">
        <h1>Список доменов</h1>
        {domains.length === 0 ? (
          <p>Нет доступных доменов.</p>
        ) : (
          <ul>
            {domains.map((domain, index) => (
              <li key={index}>
                <h2>{domain.acf?.domain_data?.domain || "Домен не найден"}</h2>
                <p><strong>Email:</strong> {domain.acf?.domain_contact?.email}</p>
                <p><strong>Телефон:</strong> {domain.acf?.domain_contact?.phone}</p>
                <p><strong>Регистратор:</strong> {domain.acf?.domain_contact?.registrator}</p>

                <p><strong>Аккаунт:</strong> {domain.acf?.domain_data?.account}</p>
                <p><strong>Домен:</strong> {domain.acf?.domain_data?.domain}</p>
                <p><strong>Дата окончания платежа:</strong> {domain.acf?.domain_data?.pay_end_date}</p>
                <p><strong>Статус:</strong> {domain.acf?.domain_data?.status}</p>
                <p><strong>Субдомен:</strong> {domain.acf?.domain_data?.subdomain}</p>

                <p><strong>DKIM:</strong> {domain.acf?.domain_dns?.dkim}</p>
                <p><strong>MX:</strong> {domain.acf?.domain_dns?.mx}</p>
                <p><strong>NS:</strong> {domain.acf?.domain_dns?.ns}</p>
                <p><strong>SPF:</strong> {domain.acf?.domain_dns?.spf}</p>

                <p><strong>IP:</strong> {domain.acf?.host_data?.ip}</p>
                <p><strong>Локация:</strong> {domain.acf?.host_data?.location}</p>
                <p><strong>Статус хоста:</strong> {domain.acf?.host_data?.status}</p>

                <p><strong>CMS:</strong> {domain.acf?.site_data?.cms}</p>
                <p><strong>Аккредитация:</strong> {domain.acf?.site_data?.accreditation}</p>
                <p><strong>Примечание:</strong> {domain.acf?.site_data?.note}</p>

                <hr />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>


  );
};

export default PageDomains;
